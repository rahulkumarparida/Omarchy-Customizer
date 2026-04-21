import Dialog from "./Dialog.jsx";

const CreateModal = ({
  isOpen,
  onClose,
  children,
  title = "Modal",
  description,
  contentClassName,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      contentClassName={contentClassName}
    >
      {children}
    </Dialog>
  );
};

export { CreateModal };
