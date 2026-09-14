import Modal from "../ui/Modal";
import QuickConvert from "./QuickConvert";

const ConvertModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Convert currency">
    <QuickConvert />
  </Modal>
);

export default ConvertModal;
