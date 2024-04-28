import { useContext } from "react"
import { StepFormContext } from "../App"
import { Form, InputNumber, Select } from "antd"
import StepFormButtonGroup from "../components/StepFormButtonGroup"
export const KEY = 'stepOne'
const NEXT_STEP_KEY = 'stepTwo'
function StepOne() {
    const [form] = Form.useForm();
    const stepFormData = useContext(StepFormContext)
    const { currentStep, stepData, setStepData, setCurrentStep, stepNum } = stepFormData
    const curStepData = stepData[KEY]
    const { mealCategory = 'breakfast', peopleNum = 1 } = curStepData || {}
    const options = [{
        value: 'breakfast',
        label: 'breakfast',
    }, {
        value: 'lunch',
        label: 'lunch',
    }, {
        value: 'dinner',
        label: 'dinner',
    }]
    return (
      <Form
        layout="vertical"
        form={form}
        initialValues={{
            mealCategory,
            peopleNum
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
        <Form.Item name="mealCategory" label="Please Select a meal" rules={[{ required: true }]}>
            <Select
                allowClear
                options={options}
            ></Select>
        </Form.Item>
        <Form.Item name="peopleNum" label="Please Enter Number of people" rules={[{ required: true }]}>
            <InputNumber controls={true} max={10} min={1} />
        </Form.Item>
        <StepFormButtonGroup {...{ currentStep, setCurrentStep, form, stepNum }} />
      </Form>
    )
}
export default StepOne