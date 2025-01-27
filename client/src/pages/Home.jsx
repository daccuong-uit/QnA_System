import React, { useState, useContext, useRef, useEffect } from 'react';
import { Layout, Button } from 'antd';
import ChatMessage from '../components/ChatMessage';
import SendCM from '../components/SendCM';
import { ClearOutlined, ArrowRightOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

import { toast } from "react-toastify";
import { AppContext } from '../context/AppContext';
import HeaderMessage from '../components/HeaderMessage';
import { Color } from '../assets/color';

const { Header, Footer, Content } = Layout;

const Home = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const {send} = useContext(AppContext);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (input.trim()) {
                const sentMessage = {
                    text: input,
                    type: 'send',
                };
                setMessages(prevMessages => [...prevMessages, sentMessage]);
                
                const inputText = input
                setInput('');

                const jsonData = await send(inputText);

                const receivedMessage = {
                    type: 'receive',
                    sentiment: jsonData.sentiment,
                    explain: jsonData.explain,
                    bert_embedding: jsonData.bert_embedding
                };
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                onSubmitHandler(e);
            }
        }
    };

    const rotationRef = useRef(0);

    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                rotationRef.current = (rotationRef.current + 10) % 360;
                document.getElementById('loader').style.transform = `rotate(${rotationRef.current}deg)`;
            }, 100);
        }
        return () => clearInterval(interval);
    }, [loading]);

    return (
        <Layout style={{ height: '100vh', backgroundColor: 'transparent' }}>
            <Header style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Color.receive }}>
                <h1 style={{ margin: 0, fontSize: '18px', color: 'black', fontWeight: 'bold' }}>Chatbot</h1>
                <button style={{
                    backgroundColor: 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '25px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, border-color 0.3s',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = Color.background;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                    <ClearOutlined style={{ marginRight: '5px' }} />
                    Clear
                </button>
            </Header>
            <Content style={{ padding: '20px', overflowY: 'auto', maxHeight: '80vh' }}>
                <div>
                    <div style={{ margin: '0 auto', maxWidth: '720px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <HeaderMessage />
                        </div>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: msg.type === 'send' ? 'flex-end' : 'flex-start' }}>
                                {msg.type === 'send' ? (
                                    <SendCM sendMessage={msg.text} />
                                ) : (
                                    <ChatMessage
                                        icon="https://via.placeholder.com/30"
                                        sentiment={msg.sentiment}
                                        explain={msg.explain}
                                        bert_embedding={msg.bert_embedding}
                                    />
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                            {loading && (
                            <div
                                id="loader"
                                style={{
                                    border: '4px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '4px solid #3498db',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    margin: '20px auto',
                                    transition: 'transform 0.1s linear'
                                }}
                            />
                        )}
                    </div>
                </div>
            </Content>

            <Footer style={{backgroundColor: Color.background}}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: 'white', 
                    border: `1px solid ${isFocused ? Color.send : Color.receivePlus}`,
                    borderRadius: '25px',
                    width: '50%',
                    margin: '0 auto', 
                    boxShadow: 'none',
                    position: 'relative',
                    height: 'auto'
                }}>
                    <TextArea 
                        placeholder="" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        autoSize={{ minRows: 1, maxRows: 5 }}
                        style={{
                            maxWidth: '90%', 
                            width: '90%', 
                            marginRight: '15px',
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            right: '20px',
                            border: 'none',
                        }}
                        />
                    <div style={{ margin: '24px 0' }} />
                    <Button 
                    type="primary" style={{ 
                        borderRadius: '25px',
                        position: 'absolute', right: '10px', 
                        bottom: `${isFocused ? '7.5px' : '7.5px'}`,
                        backgroundColor: Color.send }}
                    onClick={onSubmitHandler}>
                        <ArrowRightOutlined />
                    </Button>
                </div>
                
            </Footer>
        </Layout>
    );
};

export default Home;