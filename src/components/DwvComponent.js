import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@mui/styles";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// https://mui.com/material-ui/material-icons/
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import ContrastIcon from "@mui/icons-material/Contrast";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import StraightenIcon from "@mui/icons-material/Straighten";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";

import TagsTable from "./TagsTable";

import "./DwvComponent.css";
// import { App } from "./app_dwv";
import { decoderScripts, getDwvVersion, App } from "dwv";
import TagsTable2 from "./TagsTable2";
import { Slider, colors } from "@mui/material";
import { red } from "@mui/material/colors";

// Image decoders (for web workers)
decoderScripts.jpeg2000 = `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpeg2000.js`;
decoderScripts[
  "jpeg-lossless"
] = `${process.env.PUBLIC_URL}/assets/dwv/decoders/rii-mango/decode-jpegloss.js`;
decoderScripts[
  "jpeg-baseline"
] = `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`;
decoderScripts.rle = `${process.env.PUBLIC_URL}/assets/dwv/decoders/dwv/decode-rle.js`;

const styles = (theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    flex: "0 0 auto",
  },
  iconSmall: {
    fontSize: 20,
  },
});

export const TransitionUp = React.forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

class DwvComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: {
        dwv: getDwvVersion(),
        react: React.version,     
      },
      tools: {
        Scroll: {},
        ZoomAndPan: {},
      },
      scrollPosition: 0,
      selectedTool: "Select Tool",
      loadProgress: 0,
      dataLoaded: false,
      dwvApp: null,
      metaData: {},
      orientation: undefined,
      showDicomTags: false,
      dropboxDivId: "dropBox",
      dropboxClassName: "dropBox",
      borderClassName: "dropBoxBorder",
      hoverClassName: "hover",
      // yScroll: this.props.yScroll
    };
  }

  handleDivScroll = (event) => {
    const scrollPosition = event.target.scrollTop;
    this.setState({ scrollPosition });
  };

  render() {
    const { classes, id, imgorientation, myFun, yScroll } = this.props;
    const { versions, tools, loadProgress, dataLoaded, metaData, orientation } =
      this.state;
    window.addEventListener("wheel", (event) => {
      // Get the deltaY value from the wheel event
      const deltaY = event.deltaY;
      // Update the scroll position in the state
      // this.setState((prevState) => ({
      //   scrollY: prevState.scrollY + deltaY
      // }));
    });

    const handleToolChange = (event, newTool) => {
      if (newTool) {
        this.onChangeTool(newTool);
      }
    };

    // const handleSliderChange = (sliderValue) => {
    //   console.log("Slider value changed to:", sliderValue);
    //   try {
    //     this.onChangeTool("Scroll");
    //     const scrollableElement = document.getElementById("id3-layer-0");
    //     if (scrollableElement) {
    //       const maxScroll = scrollableElement.scrollHeight - scrollableElement.clientHeight;
    //       const scrollTo = (sliderValue / 70) * maxScroll;
    //       console.log("Max Scroll:", maxScroll);
    //       console.log("Scroll To:", scrollTo);
    //       scrollableElement.scrollTop = scrollTo;
    //       console.log("Scroll Top set to:", scrollTo);
    //     } else {
    //       console.log("Scrollable element not found");
    //     }
    //   } catch (error) {
    //     console.log("Error setting scroll position:", error);
    //   }
    // };

    const handleSliderChange = (sliderValue) => {
      console.log("Slider value changed to:", sliderValue);
      try {
        this.onChangeTool("Scroll");
        const scrollableElement = document.getElementById("id3-layer-0");
        const canvasElement = scrollableElement.querySelector("canvas");
        canvasElement.style.overflow = "scroll";
        console.log("clicked")
      } catch (error) {
        console.log("Error setting scroll position:", error);
      }
    };

    // const handleScrollChange = (event) => {
    //   try {
    //     this.onChangeTool("Scroll");
    //     document.getElementById("id3-layer-0")
    //     .addEventListener("scroll", () => {});
    //       // alert("hyhy")
    //       console.log("is clicked")
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const toolsButtons = Object.keys(tools).map((tool) => {
      return (
        <ToggleButton
          value={tool}
          key={tool}
          title={tool}
          disabled={!dataLoaded || !this.canRunTool(tool)}
        >
          {this.getToolIcon(tool)}
        </ToggleButton>
      );
    });

    return (
      <div id="dwv">
        <div className="div">
          <Stack
            direction="row"
            spacing={1}
            padding={1}
            justifyContent="center"
          >
            <ToggleButtonGroup
              size="small"
              value={this.state.selectedTool}
              exclusive
              onChange={handleToolChange}
            >
              {toolsButtons}
            </ToggleButtonGroup>

            <ToggleButton
              size="small"
              value="tags"
              title="Tags"
              disabled={!dataLoaded}
              onClick={this.handleTagsDialogOpen}
            >
              <LibraryBooksIcon />
            </ToggleButton>

            {dataLoaded && (
              <TagsTable2 data={metaData} MyFunction={this.MyFunction} />
            )}

            <Dialog
              open={this.state.showDicomTags}
              onClose={this.handleTagsDialogClose}
              TransitionComponent={TransitionUp}
            >
              <AppBar className={classes.appBar} position="sticky">
                <Toolbar>
                  <IconButton
                    color="inherit"
                    onClick={this.handleTagsDialogClose}
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.flex}
                  >
                    DICOM Tags
                  </Typography>
                </Toolbar>
              </AppBar>
              <TagsTable data={metaData} />
            </Dialog>
          </Stack>

          <div id={id} className="layerGroup">
            <div id="dropBox"></div>
          </div>
        </div>
        {/* <Slider
          track={false}
          orientation="vertical"
          className="slider"
          aria-labelledby="track-false-slider"
          defaultValue={0}
          max={70}
          onChange={(e, value) => handleSliderChange(value)}
        /> */}
{/* 
        <Slider
          track={false}
          orientation="vertical"
          className="slider"
          aria-labelledby="track-false-slider"
          defaultValue={0}
          max={70}
          onChange={(e) => handleScrollChange(e)}
        />  */}
      </div>
    );
  }

  componentDidMount() {
    try {
      // Create the DWV app
      const app = new App();

      // Initialize the DWV app
      app.init({
        dataViewConfigs: {
          "*": [{ divId: this.props.id }],
        },
        tools: this.state.tools,
      });

      // Load images from the provided imageUrls prop
      if (this.props.imageUrls.length > 0) {
        const data = this.props.imageUrls.map((data) => {
          return data;
        });

        app.loadURLs([
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          data[10],
          data[11],
          data[12],
          data[13],
          data[14],
          data[15],
          data[16],
          data[17],
          data[18],
          data[19],
          data[20],
          data[21],
          data[22],
          data[23],
          data[24],
          data[25],
          data[26],
          data[27],
          data[28],
          data[29],
          data[30],
          data[31],
          data[32],
          data[33],
          data[34],
          data[35],
          data[36],
          data[37],
          data[38],
          data[39],
          data[40],
          data[41],
          data[42],
          data[43],
          data[44],
          data[45],
          data[46],
          data[47],
          data[48],
          data[49],
          data[50],
          data[51],
          data[52],
          data[53],
          data[54],
          data[55],
          data[56],
          data[57],
          data[58],
          data[59],
          data[60],
          data[61],
          data[62],
          data[63],
          data[64],
          data[65],
          data[66],
          data[67],
          data[68],
          data[69],
          data[70],
          data[71],
          data[72],
          data[73],
          data[74],
          data[75],
        ]);
      }

      // Load events and state updates
      let nLoadItem = null;
      let nReceivedLoadError = null;
      let nReceivedLoadAbort = null;
      let isFirstRender = null;
      app.addEventListener("loadstart", (/*event*/) => {
        // Reset flags and hide the drop box
        nLoadItem = 0;
        nReceivedLoadError = 0;
        nReceivedLoadAbort = 0;
        isFirstRender = true;
        // this.showDropbox(app, false);
      });
      app.addEventListener("loadprogress", (event) => {
        // Update loadProgress state
        this.setState({ loadProgress: event.loaded });
      });
      app.addEventListener("renderend", (/*event*/) => {
        if (isFirstRender) {
          isFirstRender = false;
          // Determine the selected tool based on app capabilities
          let selectedTool = "ZoomAndPan";
          if (app.canScroll()) {
            selectedTool = "Scroll";
          }
          this.onChangeTool(selectedTool);
        }
      });
      app.addEventListener("load", (/*event*/) => {
        // Set dicom tags and dataLoaded flag
        this.setState({ metaData: app.getMetaData(0) });
        this.setState({ dataLoaded: true });

        this.toggleOrientation(this.props.id, this.props.imgorientation);
      });
      app.addEventListener("loadend", (/*event*/) => {
        if (nReceivedLoadError) {
          // Handle load error
          this.setState({ loadProgress: 0 });
          // Show drop box if nothing has been loaded
          if (!nLoadItem) {
            // this.showDropbox(app, true);
          }
        }
        if (nReceivedLoadAbort) {
          // Handle load abort
          this.setState({ loadProgress: 0 });
          // this.showDropbox(app, true);
        }
      });
      app.addEventListener("loaditem", (/*event*/) => {
        ++nLoadItem;
      });
      app.addEventListener("loaderror", (event) => {
        // Handle load error
        console.error(event.error);
        ++nReceivedLoadError;
      });
      app.addEventListener("loadabort", (/*event*/) => {
        // Handle load abort
        ++nReceivedLoadAbort;
      });
      window.addEventListener("wheel", (event) => {
        // Get the deltaY value from the wheel event
        const deltaY = event.deltaY;
        // console.log('hello',this.state.yScroll)
        // Update the scroll position in the state
        // this.setState((prevState) => ({
        //   scrollY: prevState.scrollY + deltaY
        // }));
      });
      // Handle key events and window resize
      app.addEventListener("keydown", (event) => {
        app.defaultOnKeydown(event);
      });
      window.addEventListener("resize", app.onResize);

      // Store the DWV app in the component's state
      this.setState({ dwvApp: app });

      // Setup the drop box
      // this.setupDropbox(app);

      // Optionally, load from the current URL
      app.loadFromUri(window.location.href);
    } catch (error) {
      // Handle the error, log it, or display an error message
      console.error(
        "An error occurred in the componentDidMount method:",
        error
      );
    }
  }

  /**
   * Get the icon of a tool.
   *
   * @param {string} tool The tool name.
   * @returns {Icon} The associated icon.
   */
  getToolIcon = (tool) => {
    let res;
    if (tool === "Scroll") {
      res = <MenuIcon />;
    } else if (tool === "ZoomAndPan") {
      res = <SearchIcon />;
    } else if (tool === "WindowLevel") {
      res = <ContrastIcon />;
    } else if (tool === "Draw") {
      res = <StraightenIcon />;
    }
    return res;
  };

  MyFunction = (val) => {
    this.props.myFun(val);
  };
  /**
   * Handle a change tool event.
   * @param {string} tool The new tool name.
   */
  onChangeTool = (tool) => {
    if (this.state.dwvApp) {
      this.setState({ selectedTool: tool });
      this.state.dwvApp.setTool(tool);
      if (tool === "Draw") {
        this.onChangeShape(this.state.tools.Draw.options[0]);
      }
    }
  };

  /**
   * Check if a tool can be run.
   *
   * @param {string} tool The tool name.
   * @returns {boolean} True if the tool can be run.
   */
  canRunTool = (tool) => {
    let res;
    if (tool === "Scroll") {
      res = this.state.dwvApp.canScroll();
    } else if (tool === "WindowLevel") {
      res = this.state.dwvApp.canWindowLevel();
    } else {
      res = true;
    }
    return res;
  };

  /**
   * Toogle the viewer orientation.
   */
  toggleOrientation = (id, newOrientation) => {
    this.setState({ orientation: newOrientation });
    const config = {
      "*": [
        {
          divId: id,
          orientation: newOrientation, // Use newOrientation parameter
        },
      ],
    };
    this.state.dwvApp.setDataViewConfigs(config);
    for (let i = 0; i < this.state.dwvApp.getNumberOfLoadedData(); ++i) {
      this.state.dwvApp.render(i);
    }
  };

  /**
   * Handle a change draw shape event.
   * @param {string} shape The new shape name.
   */
  onChangeShape = (shape) => {
    if (this.state.dwvApp) {
      this.state.dwvApp.setToolFeatures({ shapeName: shape });
    }
  };

  /**
   * Handle a reset event.
   */
  onReset = () => {
    if (this.state.dwvApp) {
      this.state.dwvApp.resetDisplay();
    }
  };

  /**
   * Open the DICOM tags dialog.
   */
  handleTagsDialogOpen = () => {
    this.setState({ showDicomTags: true });
  };

  /**
   * Close the DICOM tags dialog.
   */
  handleTagsDialogClose = () => {
    this.setState({ showDicomTags: false });
  };
} // DwvComponent

DwvComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DwvComponent);
