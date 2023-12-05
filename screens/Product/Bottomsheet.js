import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const Bottomsheet = () => {
    const bottomSheetModalRef = useRef(null);

    const openBottomSheet = () => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    };
    return (
    <BottomSheetModal
    ref={bottomSheetModalRef}
    index={0}
    snapPoints={['25%', '50%', '90%']}
>
    <BottomSheetScrollView 
    style={{
        flex: 1,
        backgroundColor: '#E8E8E8',
      }}>
        <Text className="text-[#AA613E] font-semibold text-2xl text-center m-4">Product is added to cart!</Text>
    </BottomSheetScrollView>
</BottomSheetModal>
  )
}

export default Bottomsheet