import { useState, useEffect } from "react";

import AppContext from "./AppContext";

const AppStateContext = (props) => {
  const [activeTab, setActiveTab] = useState("home");
  const [activeStepItem, setActiveStepItem] = useState(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);

  const [patientMetaData, setPatientMetaData] = useState([]);

  const [presentationButtonActive, setPresentationButtonActive] =
    useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStepRunning, setActiveStepRunning] = useState(false);

  const [totalTime, setTotalTime] = useState({ min: 0, sec: 0 });
  const [activeStepTime, setActiveStepTime] = useState({ min: 0, sec: 0 });
  const [points, setPoints]= useState({currect:0, wrong:0})
  // An array of steps with associated data
  const [stepsArray2, setStepsArray2] = useState([
    {
      stepNumber: 1,
      stepText: "Tumor Localization and Assessment",
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      remarks:[
        'MRI/CT Scans: Employ advanced imaging techniques such as MRI or CT scans to precisely confirm tumor location.',
        `Assessment of Surrounding Structures: Pay special attention to the tumor's relationship with critical structures like the optic nerves and pituitary gland.`
      ],
      timeSpent: { min: 0, sec: 0 },
      stepQuestionsList: [
        {
          question:
            "When encountering a suprasellar meningioma during surgery, what structures must the neurosurgeon be particularly cautious about to avoid damage?",
          options: [
            "Corpus callosum",
            "Pineal gland",
            "Thalamus",
            "Cerebellum",
          ],
          answer: "Thalamus",
          userAnswer: "",
        },
        {
          question:
            "Which cranial nerve is specifically assessed during the neurological examination for Tumor Localization? ",
          options: [
            "Cranial nerve II (Optic)",
            "Cranial nerve V (Trigeminal)",
            "Cranial nerve VII (Facial)",
            "Cranial nerve X (Vagus)",
          ],
          answer: "Cranial nerve II (Optic)",
          userAnswer: "",
        },
        {
          question:
            "In the context of Tumor/Meningioma Localization, what is the significance of using diffusion tensor imaging (DTI) compared to traditional MRI techniques?",
          options: [
            "Identifying tumor vascularity",
            "Evaluating tumor metabolic activity",
            "Mapping white matter pathways",
            "Assessing tumor perfusion",
          ],
          answer: "Mapping white matter pathways",
          userAnswer: "",
        },
        {
          question:
            "In the preoperative planning for tumor resection, what information does functional brain mapping provide regarding eloquent areas?",
          options: [
            "Tumor invasion patterns",
            "Blood supply to the tumor",
            "Regions critical for language, motor, or sensory functions",
            "Tumor genetic mutations",
          ],
          answer: "Regions critical for language, motor, or sensory functions",
          userAnswer: "",
        },
        {
          question:
            "When dealing with a tumor adjacent to the third ventricle, what specific challenges may arise during Tumor Localization and how can they be addressed surgically?",
          options: [
            "Risk of hydrocephalus; ventriculostomy placement",
            "Increased intracranial pressure; lumbar puncture",
            "Cerebrospinal fluid leakage; duraplasty",
            "Vascular compromise; aneurysm clipping",
          ],
          answer: "Cerebrospinal fluid leakage; duraplasty",
          userAnswer: "",
        },
      ],
    },
    {
      stepNumber: 2,
      stepText:
        "Dissecting Olfactory Nerves and Coagulating the Tumor Attachment",
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      remarks: [
        `Olfactory Nerve Dissection: Approach this with utmost precision to preserve olfactory function. The olfactory nerves are delicate and vulnerable to damage, which can lead to a permanent loss of smell.`,
        'Coagulating Tumor Attachment: Coagulate the tumor attachment meticulously to minimize bleeding, ensuring a clearer surgical field',
        'Prevention of Damage to Surrounding Structures: Be vigilant to avoid any inadvertent damage to nearby structures. This step requires a balance between effective tumor detachment and the preservation of healthy tissue.',

      ],
      timeSpent: { min: 0, sec: 0 },
      stepQuestionsList: [
        {
          question:
            "What is the primary goal of dissecting olfactory nerves during thesurgical step 'Dissecting Olfactory Nerves and Coagulating the Tumor Attachment?'",
          options: [
            "Preserving olfactory function",
            "Reducing tumor vascularity",
            "Enhancing visual field perception",
            "Minimizing postoperative pain",
          ],
          answer: "Preserving olfactory function",
          userAnswer: "",
        },
        {
          question:
            "Which surgical instrument is commonly used for delicate dissection of olfactory nerves in this step?",
          options: [
            "Bipolar forceps",
            "Cavitron ultrasonic aspirator",
            "Kerrison rongeur",
            "Scalpel",
          ],
          answer: "Bipolar forceps",
          userAnswer: "",
        },
        {
          question:
            "What is the significance of coagulating the tumor attachment during this step of the surgery?",
          options: [
            "To induce tumor shrinkage",
            "To prevent tumor recurrence",
            "To facilitate tumor dissection",
            "To improve cosmetic outcomes",
          ],
          answer: "To facilitate tumor dissection",
          userAnswer: "",
        },
        {
          question:
            "When dissecting olfactory nerves, what anatomical landmarks should the neurosurgeon be particularly attentive to, to avoid unintended damage?",
          options: [
            "Optic chiasm",
            "Pituitary gland",
            "Frontal sinus",
            "Cribriform plate",
          ],
          answer: "Cribriform plate",
          userAnswer: "",
        },
        {
          question:
            "Which intraoperative monitoring technique is crucial during the dissection of olfactory nerves to assess their functional integrity?",
          options: [
            "Electromyography (EMG)",
            "Somatosensory Evoked Potentials (SSEP)",
            "Olfactory Evoked Potentials (OEP)",
            "Electroencephalography (EEG)",
          ],
          answer: "Olfactory Evoked Potentials (OEP)",
          userAnswer: "",
        },
      ],
    },
    {
      stepNumber: 3,
      stepText: "Coagulating Tumor Capsule",
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      remarks:[
        'Effective Hemostasis: Focus on coagulating the tumor capsule for effective hemostasis, minimizing bleeding during dissection.',
        'Choice of Energy Sources: Employ appropriate energy sources such as radiofrequency to achieve optimal coagulation.',
        'Thermal Injury Prevention: Be mindful of potential thermal injury and ensure controlled coagulation.'
      ],
      timeSpent: { min: 0, sec: 0 },
      stepQuestionsList: [
        {
          question:
            "During this step, what is the primary purpose of coagulating the tumor capsule?",
          options: [
            "Enhance tumor visibility",
            "Reduce tumor vascularity",
            "Facilitate tumor dissection",
            "Induce tumor shrinkage",
          ],
          answer: "Reduce tumor vascularity",
          userAnswer: "",
        },
        {
          question:
            "Which energy source is commonly used for coagulating the tumor capsule during this step of the surgery?",
          options: [
            "Ultrasonic energy",
            "Laser energy",
            "Radiofrequency energy",
            "Microwave energy",
          ],
          answer: "Radiofrequency energy",
          userAnswer: "",
        },
        {
          question:
            "In cases of meningiomas with high vascularity, what precautionary measures should be taken during the coagulation of the tumor capsule to avoid excessive bleeding?",
          options: [
            "Use of high-energy settings for rapid coagulation",
            "Frequent pauses to allow for tissue cooling",
            "Application of hemostatic agents",
            "Avoidance of coagulation altogether",
          ],
          answer: "Frequent pauses to allow for tissue cooling",
          userAnswer: "",
        },
        {
          question:
            "What is the potential risk associated with overheating or excessive coagulation of the tumor capsule during this step?",
          options: [
            "Delayed wound healing",
            "Tumor encapsulation",
            "Thermal injury to surrounding structures",
            "Tumor calcification",
          ],
          answer: "Thermal injury to surrounding structures",
          userAnswer: "",
        },
        {
          question:
            "When encountering a meningioma with a thickened or fibrous capsule, what specialized instrument or technique may be employed to optimize coagulation and dissection?",
          options: [
            "Monopolar electrocautery",
            "Cold saline irrigation",
            "Micro-scissors dissection",
            "Ultrasonic aspirator",
          ],
          answer: "Ultrasonic aspirator",
          userAnswer: "",
        },
      ],
    },
    {
      stepNumber: 4,
      stepText: "Dissection from the Optic Nerves",
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      remarks:[
        'Careful Dissection: Carefully dissect the tumor from optic nerves, avoiding excessive traction to prevent nerve damage.',
        'Optic Canal Identification: Identify the optic canal as a critical landmark during dissection to ensure precision.',
        'Enhanced Visualization: Utilize specialized imaging, like indocyanine green (ICG) fluorescence, for enhanced optic nerve visualization.'
      ],
      timeSpent: { min: 0, sec: 0 },
      stepQuestionsList: [
        {
          question:
            "When dissecting from the optic nerves, what is the primary consideration to avoid damage to these structures?",
          options: [
            "Optic nerve traction",
            " Rapid dissection speed",
            "Direct pressure on the optic nerves",
            "Coagulation of optic nerve sheath",
          ],
          answer: "Optic nerve traction",
          userAnswer: "",
        },
        {
          question:
            "Which anatomical landmark is crucial to identify during the dissection from the optic nerves to ensure accurate localization and prevent inadvertent injury?",
          options: [
            "Optic chiasm",
            "Optic canal",
            "Cavernous sinus",
            "Sella turcica",
          ],
          answer: "Optic canal",
          userAnswer: "",
        },
        {
          question:
            "In cases where the tumor is intimately involved with the optic nerves, what technique can be employed to enhance visualization and aid in meticulous dissection?",
          options: [
            "Intraoperative MRI",
            "Neuro-navigation",
            "Indocyanine green (ICG) fluorescence imaging",
            "Controlled hypothermia",
          ],
          answer: "Indocyanine green (ICG) fluorescence imaging",
          userAnswer: "",
        },
        {
          question:
            "When encountering a meningioma compressing the optic nerves, what is a potential consequence of inadequate decompression during this step?",
          options: [
            "Postoperative infection",
            "Visual deficits",
            "Cerebrospinal fluid leak",
            "Cranial nerve palsy",
          ],
          answer: "Visual deficits",
          userAnswer: "",
        },
        {
          question:
            "In the dissection from the optic nerves, what role does microsurgical instrumentation play in preserving delicate structures and minimizing trauma?",
          options: [
            "Rapid tumor extraction",
            "Facilitated coagulation",
            "Controlled tissue dissection",
            "Enhanced blood vessel visibility",
          ],
          answer: "Controlled tissue dissection",
          userAnswer: "",
        },
      ],
    },
    {
      stepNumber: 5,
      stepText: "Tumor Decompression and Further Dissection",
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      remarks:[
        'Gradual Decompression: Decompress the tumor gradually to facilitate further dissection, minimizing the risk of bleeding.',
        'Controlled Dissection: Prioritize controlled dissection, avoiding excessive traction on surrounding structures.',
        'Intraoperative Imaging: Leverage intraoperative imaging to visualize residual tumor volume and guide precise dissection.',
      ],
      timeSpent: { min: 0, sec: 0 },
      stepQuestionsList: [
        {
          question:
            "During Tumor Decompression, what is the primary goal, and how does it contribute to the subsequent stages of the surgery?",
          options: [
            "To reduce tumor size, facilitating easier removal",
            "To induce tumor calcification for easier dissection",
            "To minimize blood supply to the tumor",
            "To enhance tumor vascularity for better visualization",
          ],
          answer: "To reduce tumor size, facilitating easier removal",
          userAnswer: "",
        },
        {
          question:
            "In the context of Tumor Decompression, what role does intraoperative imaging play, and how can it guide further dissection?",
          options: [
            "Confirming tumor vascularity",
            "Assessing optic nerve integrity",
            "Visualizing residual tumor volume",
            "Monitoring cerebral blood flow",
          ],
          answer: "Visualizing residual tumor volume",
          userAnswer: "",
        },
        {
          question:
            "When encountering a highly vascular tumor, what precautionary measures should the neurosurgeon take during the process of Tumor Decompression?",
          options: [
            "Avoiding decompression altogether",
            "Rapid decompression to minimize bleeding",
            "Controlled and gradual decompression",
            "Utilizing high-energy coagulation",
          ],
          answer: "Controlled and gradual decompression",
          userAnswer: "",
        },
        {
          question:
            "During Further Dissection, what technique can be employed to identify and preserve critical neural structures adjacent to the tumor?",
          options: [
            "Ultrasonic aspirator for en-bloc resection",
            "Intraoperative MRI for real-time imaging",
            "Micro-scissors dissection for precision",
            "Neuro-navigation for guidance",
          ],
          answer: "Micro-scissors dissection for precision",
          userAnswer: "",
        },
        {
          question:
            "In the context of Tumor Decompression and Further Dissection, what is the significance of mapping eloquent areas using functional brain mapping techniques?",
          options: [
            "Identifying tumor adherence points",
            "Assessing tumor cellularity",
            "Avoiding damage to critical brain regions",
            "Inducing tumor shrinkage",
          ],
          answer: "Avoiding damage to critical brain regions",
          userAnswer: "",
        },
      ],
    },
    {
      stepNumber: 6,
      stepText: "Tumor Removal from Surrounding Structures",
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      remarks:[
        'Meticulous Removal: Remove the tumor from surrounding structures, such as optic nerves and the pituitary gland, with meticulous care.',
        'Minimize Structural Damage: Minimize damage to these structures during the removal process.',
        'Thoroughness: Ensure thorough removal of the tumor, leaving no remnants behind.'
      ],
      timeSpent: { min: 0, sec: 0 },
      stepQuestionsList: [
        {
          question:
            "When removing the tumor from surrounding structures, what is the primary consideration to prevent injury to critical neural and vascular elements?",
          options: [
            "Rapid tumor extraction",
            "Controlled and meticulous dissection",
            "Tumor fragmentation for easier removal",
            "Application of high-energy coagulation",
          ],
          answer: "Controlled and meticulous dissection",
          userAnswer: "",
        },
        {
          question:
            "In cases where the tumor is adherent to the optic chiasm, what technique can be employed to achieve safe separation without compromising visual function?",
          options: [
            "Bipolar coagulation",
            "Controlled hypothermia dissection",
            "Micro-scissors dissection",
            "Ultrasonic aspirator for en-bloc resection",
          ],
          answer: "Micro-scissors dissection",
          userAnswer: "",
        },
        {
          question:
            "During Tumor Removal from Surrounding Structures, what role does intraoperative neuro-monitoring play, and how does it guide the neurosurgeon?",
          options: [
            "Assessing tumor vascularity",
            "Monitoring neural function in real-time",
            "Mapping eloquent areas for resection",
            "Evaluating tumor cellularity",
          ],
          answer: "Monitoring neural function in real-time",
          userAnswer: "",
        },
        {
          question:
            "When encountering tumor adherence to major blood vessels, what technique can be employed to safely dissect the tumor without compromising vascular integrity?",
          options: [
            "Direct application of pressure on blood vessels",
            "Controlled hypothermia dissection",
            "Bipolar coagulation",
            "Intraoperative angiography for real-time assessment",
          ],
          answer: "Bipolar coagulation",
          userAnswer: "",
        },
        {
          question:
            "In the context of Tumor Removal from Surrounding Structures, what considerations should the neurosurgeon make to minimize the risk of postoperative complications?",
          options: [
            "Prolonged surgery for thorough tumor removal",
            "Minimizing preoperative imaging review",
            "Adequate hemostasis and meticulous closure",
            "Delayed postoperative imaging for assessment",
          ],
          answer: "Adequate hemostasis and meticulous closure",
          userAnswer: "",
        },
      ],
    },
  ]);

  const resetStates=()=>{
    setPresentationButtonActive(false)
    setIsPlaying(false)
    setActiveStepRunning(false)
    setTotalTime({ min: 0, sec: 0 })
    setActiveStepTime({ min: 0, sec: 0 })
    setPoints({currect:0, wrong:0})
    setActiveStepItem(null)
    setProgress(0)
    setUser(null)

    setStepsArray2(stepsArray2.map(step => ({
      ...step,
      isStepCompleted: false,
      isInProcess: false,
      isActive: false,
      timeSpent:{ min: 0, sec: 0 },
      stepQuestionsList: step.stepQuestionsList.map(question => ({
        ...question,
        userAnswer: ""
      }))
    })))


  }
  // useEffect to track and update the total time
  const setPointsUpdate=(newPoint)=>{
    setPoints(prevData => ({
      ...prevData,
      ...newPoint 
    }));
  }
  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setTotalTime((prevTotalTime) => {
          let newSec = prevTotalTime.sec + 1;
          let newMin = prevTotalTime.min;
          if (newSec === 60) {
            newSec = 0;
            newMin += 1;
          }
          return { min: newMin, sec: newSec };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // useEffect to track and update the time for the active step
  useEffect(() => {
    let activeInterval = null;

    if (activeStepRunning) {
      activeInterval = setInterval(() => {
        setActiveStepTime((prevStepTime) => {
          let newSec = prevStepTime.sec + 1;
          let newMin = prevStepTime.min;
          if (newSec === 60) {
            newSec = 0;
            newMin += 1;
          }
          return { min: newMin, sec: newSec };
        });
      }, 1000);
    } else {
      clearInterval(activeInterval);
    }

    return () => clearInterval(activeInterval);
  }, [activeStepRunning]);

  // Provides state and functions to the components within the context
  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeStepItem,
        setActiveStepItem,
        stepsArray2,
        setStepsArray2,
        totalTime,
        setTotalTime,
        activeStepTime,
        setActiveStepTime,
        points,
        setPointsUpdate,
        isPlaying,
        setIsPlaying,
        activeStepRunning,
        setActiveStepRunning,
        presentationButtonActive,
        setPresentationButtonActive,
        progress,
        setProgress,
        user,
        setUser,
        resetStates
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppStateContext;
