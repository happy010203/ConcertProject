import React, { useState } from 'react';
import Modal from './Modal';  // 引入剛才建立的 Modal 組件

const App = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div>
            <input type="submit" value="登入" onClick={openModal} />

            <Modal show={showModal} handleClose={closeModal}>
                <h2>登入畫面</h2>
                <form>
                    <label>用戶名：</label>
                    <input type="text" name="username" /><br /><br />
                    <label>密碼：</label>
                    <input type="password" name="password" /><br /><br />
                    <input type="submit" value="提交" />
                </form>
            </Modal>
        </div>
    );
};

export default App;
