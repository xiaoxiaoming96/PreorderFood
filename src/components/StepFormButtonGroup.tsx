import { Button, Form, Space } from "antd"

type Props = {
    currentStep: number
    setCurrentStep: Function
    form: any
    stepNum: number
}
const StepFormButtonGroup = (props: Props) => {
    const { currentStep, setCurrentStep, form, stepNum } = props
    return (
        <Form.Item>
            <Space>
                {currentStep > 0 ? <Button type="primary" onClick={() => {
                    setCurrentStep(currentStep - 1)
                }}>
                    Previous
                </Button> : null}
                <Button onClick={()=>{
                    form.submit()
                }}>
                    { currentStep < stepNum -1 ? 'Next' : 'Submit' }
                </Button> 
            </Space>
        </Form.Item>
    )
}
export default StepFormButtonGroup