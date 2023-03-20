import { useState } from 'react';
import { MdOutlinePhonelinkRing } from 'react-icons/md';

import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
export default function ModalPage() {
  const [modal, setModal] = useState(false);
  return (
    <div className='py-10 px-10'>
      <Button variant='filled' onClick={() => setModal(true)}>
        Open Modal
      </Button>
      <Modal
        title='Testing Modal'
        isOpen={modal}
        centerTitle
        setIsOpen={setModal}
        icon={MdOutlinePhonelinkRing}
      >
        <div className='py-5'>
          <Typography variant='body1'>
            A dialog is a type of modal window that appears in front of app
            content to provide critical information, or prompt for a decision to
            be made.
          </Typography>
        </div>

        <div className='flex items-center justify-end gap-4'>
          <Button variant='text' onClick={() => setModal(false)}>
            Ya
          </Button>
          <Button variant='text' onClick={() => setModal(false)}>
            Tidak
          </Button>
        </div>
      </Modal>
    </div>
  );
}
