import {yupResolver} from '@hookform/resolvers/yup';
import {COLORS} from 'constants/theme';
import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import * as yup from 'yup';
import {usePost} from '../hooks/usePost';
import {IPost} from '../interfaces/PostInterfaces';

const postSchema = yup.object().shape({
  post: yup.string().required('Post is required'),
});

interface PostData {
  post: string;
}

interface EditModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  item: IPost;
  imgSrc: string;
  refetchPosts: ({img_id}: {img_id: number}) => void;
}

export const EditModal: FC<EditModalProps> = ({
  modalVisible,
  setModalVisible,
  item,
  imgSrc,
  refetchPosts,
}) => {
  const {handleSubmit, control} = useForm<PostData>({
    defaultValues: {
      post: item.post,
    },
    resolver: yupResolver(postSchema),
  });

  const {editPost} = usePost();

  const onSubmit = (data: PostData) => {
    Keyboard.dismiss();
    Alert.alert('Edit Post', 'Are you sure you want to edit this post?', [
      {
        text: 'Cancel',
        onPress: () => setModalVisible(false),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          editPost({
            variables: {
              editPostId: item.id,
              post: data.post,
              imgSource: imgSrc,
            },
          });
          refetchPosts({
            img_id: item.img_id,
          });
          setModalVisible(!modalVisible);
        },
      },
    ]);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.input}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{flex: 1, fontSize: 16}}
                  defaultValue={item.post}
                  onBlur={onBlur}
                  onChangeText={text => onChange(text)}
                  value={value}
                  placeholder="Write a comment..."
                  placeholderTextColor={COLORS.gray}
                />
              )}
              name="post"
              rules={{required: true}}
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textStyle}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    height: '50%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 80,
    backgroundColor: COLORS.lightGray,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
