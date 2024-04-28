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
            <Space 
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: currentStep <= 0 ? 'flex-end' : 'space-between',
            }}>
                {currentStep > 0 ? <Button onClick={() => {
                    setCurrentStep(currentStep - 1)
                }}>
                    Previous
                </Button> : null}
                <Button type="primary" onClick={()=>{
                    form.submit()
                }}>
                    { currentStep < stepNum -1 ? 'Next' : 'Submit' }
                </Button> 
            </Space>
        </Form.Item>
    )
}
export default StepFormButtonGroup