import Modal from 'react-modal';
import css from './ImageModal.module.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function ImageModal({ img, likes, user, modalState, onClose }) {
    return (
        <div>
            <Modal isOpen={modalState} onRequestClose={onClose} style={customStyles} >
                <img src={img} className={css.image} />
                <div className={css.socials}>
                    <p className={css.text}>Likes: {likes}</p>
                    <p className={css.text}>Instagram: {user}</p>
                </div>
            </Modal>
        </div>
    )
}