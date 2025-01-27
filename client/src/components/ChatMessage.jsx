import React from 'react';
import { Button, Space } from 'antd';
import { ReloadOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';
import { Color } from '../assets/color';
import { Icon } from '../assets/icon';

const ChatMessage = ({ icon, sentiment, explain, bert_embedding }) => {

    if (sentiment === 1) {
        sentiment = 'Positive';
        icon = Icon.positive;
    } else{
        if(sentiment === 0){
            sentiment = 'Negative';
            icon = Icon.negative;
        }
        else{
            sentiment = 'Neutral';
            icon = Icon.neutral;
        }
    }

    return (
        <div style={{padding: '10px', marginBottom: '5px', backgroundColor: 'transparent', fontSize: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <img src={icon} alt="icon" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                <span style={{ marginLeft: '10px', fontWeight: 'normal' }}>Chatbot</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ backgroundColor: Color.receive, padding: '10px', borderRadius: '10px' }}>
                <strong>TF-TDF:</strong> {explain}
                <br />
                <strong>BERT_Embedding:</strong> {bert_embedding}
            </div>
            </div>
            <Space>
                <Button 
                    size="small" 
                    shape="circle" 
                    icon={<ReloadOutlined />} 
                    style={{ borderRadius: '50%' }} 
                />
                <Button 
                    size="small" 
                    shape="circle" 
                    icon={<HeartOutlined />} 
                    style={{ borderRadius: '50%' }} 
                />
                <Button 
                    size="small" 
                    shape="circle" 
                    icon={<FrownOutlined />} 
                    style={{ borderRadius: '50%' }} 
                />
            </Space>
        </div>
    );
};

export default ChatMessage;