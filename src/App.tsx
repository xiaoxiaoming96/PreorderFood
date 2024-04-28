import { useState, createContext } from 'react';
import { Steps } from 'antd';
import StepOne from './modules/StepOne';
import StepTwo from './modules/StepTwo';
import StepThree from './modules/StepThree';
import Review from './modules/Review';
import dishes from './mock/mockDishes';

export const StepFormContext = createContext<Record<string, any>>({})

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  
  const [stepData, setStepData] = useState<Record<string, any>>({dishDataSource: dishes})
  const stepModules = [<StepOne />, <StepTwo />, <StepThree />, <Review />]
  const stepNum = stepModules.length
  const showStepModule = stepModules[currentStep]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Steps
        style={{
          width: '50%'
        }}
        current={currentStep}
        items={[
          {
            title: 'Step1',
          },
          {
            title: 'Step2',
          },
          {
            title: 'Step3',
          },
          {
            title: 'Review',
          },
        ]}
      />
      {
        <StepFormContext.Provider value={{
          currentStep,
          setCurrentStep,
          stepNum,
          stepData,
          setStepData
        }}>
          <div style={{ marginTop: 20, width: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            { showStepModule }
          </div>
        </StepFormContext.Provider>
        }
    </div>
  );
}

export default App;
