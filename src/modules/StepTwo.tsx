import { Form, Select } from "antd";
import { useContext } from "react";
import { StepFormContext } from "../App";
import StepFormButtonGroup from "../components/StepFormButtonGroup";
import { KEY as PREV_KEY } from "./StepOne";
export const KEY = 'stepTwo'
const NEXT_STEP_KEY = 'stepThree'

function StepTwo() {
    
    const [form] = Form.useForm();
    const stepFormData = useContext(StepFormContext)
    const { currentStep, stepData, setStepData, setCurrentStep, stepNum } = stepFormData
    const curStepData = stepData[KEY]
    const prevStepData = stepData[PREV_KEY]
    const { mealCategory } = prevStepData
    const { restaurant } = curStepData || {}
    const { dishDataSource } = stepData
    const options = dishDataSource.filter((dish: Record<string, any>)=>{
        const { availableMeals } = dish
        return availableMeals.includes(mealCategory)
    }).map((dish: Record<string, any>)=>{
        return dish.restaurant
    }).filter((item: string, index: number, arr: Array<string>) => arr.indexOf(item) === index).map((restaurant: string)=>{
        return {
            value: restaurant,
            label: restaurant,
        }
    })
    return (
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 600 }}
        initialValues={{
            restaurant
        }}
        onFinish={()=>{
            stepData[KEY] = form.getFieldsValue()
            stepData[NEXT_STEP_KEY] = {}
            setStepData((originData: Record<string, any>)=>({
                ...originData,
                ...stepData
            }))
            setCurrentStep(currentStep + 1)
        }}
        onFinishFailed={()=>{
            console.info("validation failed");
        }}
      >
        <Form.Item name="restaurant" label="Please Select a Restaurant" rules={[{ required: true }]}>
            <Select
                allowClear
                options={options}
            >
            </Select>
        </Form.Item>
        <StepFormButtonGroup {...{ currentStep, setCurrentStep, form, stepNum }} />
      </Form>
    )
}
export default StepTwo