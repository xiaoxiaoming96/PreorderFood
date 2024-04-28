import { Form } from "antd";
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
                    <div>{`${selectedDish.name}-${selectedDish.num}`}</div>
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
        <Form.Item
            label={'Dishes'}
        >   
            <div>
                {
                    selectedDishes?.map((selectedDish: Record<string, any>)=>{
                        return (
                            <div>{`${selectedDish.name}-${selectedDish.num}`}</div>
                        )
                    })
                }
            </div>
        </Form.Item>
        <StepFormButtonGroup {...{ currentStep, setCurrentStep, form, stepNum }} />
      </Form>
    )
}
export default Review