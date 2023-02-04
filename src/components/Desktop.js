import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
const Desktop = ({ children, background }) => {
	const bg = useColorModeValue(background,background);
	
  return (
    <Box
	  height="100vh"
	  width="100vw"
	  background={bg}
	  overflow="hidden"
	  border="none"
	>
      <Flex justifyContent="center" alignItems="center">
        {' '}
        {children}{' '}
      </Flex>
    </Box>
  );
};
export default Desktop;
