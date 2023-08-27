import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: any;
}

export default function ModalBottomSheet({ children, isOpen, setIsOpen }: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (isOpen) {
      handlePresentModalPress();
    }
  }, [isOpen, handlePresentModalPress]);

  const renderBackdrop = useCallback((props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} pressBehavior={"close"} />, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setIsOpen(false);
  }, []);

  return (
    <View style={styles.container}>
      {isOpen && (
        <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} backdropComponent={renderBackdrop} onDismiss={handleCloseModalPress}>
          <View style={styles.contentContainer}>{children}</View>
        </BottomSheetModal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal:15
  },
});
