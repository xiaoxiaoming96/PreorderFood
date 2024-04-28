import { Form, InputNumber, Select, Space } from "antd";
import { useContext } from "react";
import { StepFormContext } from "../App";
import StepFormButtonGroup from "../components/StepFormButtonGroup";
import { KEY as STEP_ONE_KEY } from "./StepOne";
import { KEY as STEP_TWO_KEY } from "./StepTwo";
export const KEY = 'stepThree'
const NEXT_STEP_KEY = 'review'
function StepThree() {
    const [form] = Form.useForm();
    const stepFormData = useContext(StepFormContext)
    const { currentStep, stepData, setStepData, setCurrentStep, stepNum } = stepFormData
    const curStepData = stepData[KEY]
    const { selectedDishes = [] } = curStepData || {}
    const initialSelectedDishIds = selectedDishes?.map((selectedDish: Record<string, any>)=>{
        return selectedDish.id
    })
    const { mealCategory, peopleNum } = stepData[STEP_ONE_KEY]
    const { restaurant } = stepData[STEP_TWO_KEY]
    const { dishDataSource } = stepData
    const dishOptions = dishDataSource.filter((dish: Record<string, any>)=>{
        return dish?.availableMeals?.includes(mealCategory) && dish?.restaurant === restaurant
    }).map((dish: Record<string, any>)=>{
        return (
            {
                value: dish.id,
                label: dish.name,
            }
        )
    })
    return (
      <Form
        layout="vertical"
        form={form}
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
        <Form.Item
            label={'Please Select dishes'}
        >
            <Select
                mode="multiple"
                style={{ maxWidth: 300 }}
                allowClear
                options={dishOptions}
                defaultValue={initialSelectedDishIds}
                onChange={(selectedDishIds: Array<number>)=>{
                    const selectedDishes = dishDataSource.filter((dish: Record<string, any>)=>{
                        return selectedDishIds.includes(dish.id)
                    }).map((selectedDish: Record<string, any>)=>{
                        return {
                            ...selectedDish,
                            num: 1
                        }
                    })
                    form.setFieldValue('selectedDishes', selectedDishes)
                }}
            >
            </Select>
        </Form.Item>
        <Form.List
            name="selectedDishes"
            initialValue={selectedDishes}
            rules={[
            {
                validator: async (_, selectedDishes: Array<Record<string, any>>) => {
                    if (!selectedDishes || selectedDishes.length < 1) {
                        return Promise.reject(new Error('Please Select At least 1 dish'));
                    }
                    const numOfOrderedDishes = selectedDishes.reduce((sum, selectedDish)=>{
                        return sum + selectedDish.num
                    }, 0)
                    if(numOfOrderedDishes < peopleNum) {
                        return Promise.reject(new Error('Total Num of Dishes Less than Num of People Selected in Step One'));
                    }
                },
            },
            ]}
        >
        {(fields, { add, remove }, { errors }) => {
            return (
            <>
                {fields.map(({ key, name, ...restField }) => {
                    const dishName = form.getFieldValue('selectedDishes')[name].name
                    return (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                label={`Please Enter No. of ${dishName}'s Servings`}
                                name={[name, 'num']}
                                rules={[{ required: true, message: 'Missing Num of Servings' }]}
                            >
                                <InputNumber min={1} max={10} />
                            </Form.Item>
                        </Space>
                    )
                })}
                {errors.length > 0 ? <Form.Item>
                    <Form.ErrorList errors={errors} />
                </Form.Item> : null}
            </>
            )
        }}
        </Form.List>
        <StepFormButtonGroup {...{ currentStep, setCurrentStep, form, stepNum }} />
      </Form>
    )
}
export default StepThree