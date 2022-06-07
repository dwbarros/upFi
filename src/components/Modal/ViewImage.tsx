import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';


interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}


export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        m="2rem auto"
        bg="transparent"
        w="auto"
        h="auto"
        maxW="80vw"
        maxH="80vh"
      >
        <ModalBody p="0">
          <Image
            src={imgUrl}
            h="100%"
            w="100%"
          />
        </ModalBody>

        <ModalFooter 
          h="1.5rem"
          bg="pGray.800"
          borderBottomRadius="6px"
          justifyContent="left"
        >
          <Link
            href={imgUrl}
            isExternal
            fontSize="0.875rem"
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
