import { Col, Form, Row, Input, Card, Button } from 'antd';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import { formDataTypes } from '@/types/common';
import { fetchQuestions } from '../utils/api'
import { saveUserEmailId, setQuestions, setLoadingQuestions } from "../redux/actions"
import { useDispatch } from 'react-redux'

function Start() {
    const router = useRouter()
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinishForm = async (values: formDataTypes) => {
        if (values?.email) {
            router.push('/quiz')
            dispatch(setLoadingQuestions(true))
            const questions = await fetchQuestions()
            dispatch(setQuestions(questions))
            dispatch(setLoadingQuestions(false))
            dispatch(saveUserEmailId(values?.email))
        }
    };
    return (
        <>
            <div className={styles.main}>
                <h1 className={styles.pageHeader}>Please enter your email to start the quiz.</h1><br />
                <Card className={styles.startCard}>
                    <Form
                        layout="vertical"
                        form={form}
                        className="innerForm"
                        initialValues={{ remember: true }}
                        onFinish={onFinishForm}>

                        <Form.Item>
                            <Row gutter={24}>
                                <Col xs={12} lg={24}>
                                    <Form.Item
                                        label="Email Address"
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Email address must be an valid email.'
                                            },
                                            {
                                                required: true,
                                                message: 'Email is required.'
                                            }
                                        ]}>
                                        <Input size="large" placeholder="Enter email address" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className={styles.btnSubmit}
                                type="primary"
                                htmlType="submit"
                                size={'large'}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        </>
    )
}
export default Start