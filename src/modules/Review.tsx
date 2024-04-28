import { Form, Space } from "antd";
import { useContext } from "react";
import { StepFormContext } from "../App";
import StepFormButtonGroup from "../components/StepFormButtonGroup";
import { KEY as STEP_ONE_KEY } from "./StepOne";
import { KEY as STEP_TWO_KEY } from "./StepTwo";
import { KEY as STEP_THREE_KEY } from "./StepThree";
export const KEY = 'review'
function Review() {
    const [form] = Form.useForm();
    const stepFormData = useContext(StepFormContext)
    const { currentStep, stepData, setCurrentStep, stepNum } = stepFormData
    const stepThreeData = stepData[STEP_THREE_KEY]
    const { selectedDishes } = stepThreeData || {}
    const { mealCategory, peopleNum } = stepData[STEP_ONE_KEY]
    const { restaurant } = stepData[STEP_TWO_KEY]

    return (
      <Form
        layout="horizontal"
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={()=>{
            console.info("Meal: ", mealCategory)
            console.info("No. of People: ", peopleNum)
            console.info("Restaurant: ", restaurant)
            console.info("Dishes: ", selectedDishes?.map((selectedDish: Record<string, any>)=>{
                return (
                    `${selectedDish.name}-${selectedDish.num}`
                )
            }))
        }}
        onFinishFailed={()=>{
            console.info("validation failed");
        }}
      >
        <Form.Item
            label={'Meal'}
        >
            {mealCategory}
        </Form.Item>
        <Form.Item
            label={'No. of People'}
        >
            {peopleNum}
        </Form.Item>
        <Form.Item
            label={'Restaurant'}
        >
            {restaurant}
        </Form.Item>
        <Form.Item>   
            <Space style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <div>Dishes：</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        selectedDishes?.map((selectedDish: Record<string, any>)=>{
                            return (
                                <div key={selectedDish.id}>{`${selectedDish.name}-${selectedDish.num}`}</div>
                            )
                        })
                    }
                </div>          
            </Space>
        </Form.Item>
        <StepFormButtonGroup {...{ currentStep, setCurrentStep, form, stepNum }} />
      </Form>
    )
}
export default Review