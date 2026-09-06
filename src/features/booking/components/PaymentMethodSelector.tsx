import React from 'react';
import { Form, Radio, type FormInstance } from 'antd';
import { CreditCard } from 'lucide-react';

interface PaymentMethodSelectorProps {
    form: FormInstance;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ form }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Phương thức thanh toán</h2>
            <Form.Item name="paymentMethod" initialValue="vnpay">
                <Radio.Group className="w-full space-y-4">
                    <div
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white"
                        onClick={() => form.setFieldValue('paymentMethod', 'credit_card')}
                    >
                        <Radio value="credit_card" className="font-medium text-slate-800">
                            Thẻ Tín dụng / Ghi nợ (Credit/Debit Card)
                        </Radio>
                        <CreditCard size={24} className="text-slate-400" />
                    </div>
                    <div
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white"
                        onClick={() => form.setFieldValue('paymentMethod', 'momo')}
                    >
                        <Radio value="momo" className="font-medium text-slate-800">
                            Ví MoMo
                        </Radio>
                        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            M
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white"
                        onClick={() => form.setFieldValue('paymentMethod', 'vnpay')}
                    >
                        <Radio value="vnpay" className="font-medium text-slate-800">
                            VNPay
                        </Radio>
                        <div className="text-blue-600 font-bold text-sm">VNPay</div>
                    </div>
                </Radio.Group>
            </Form.Item>
        </div>
    );
};
