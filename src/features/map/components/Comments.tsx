import {yupResolver} from '@hookform/resolvers/yup';
import {COLORS, SIZES} from 'constants/theme';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePost} from '../hooks/usePost';
import {Comment} from './Comment';

interface CommentsProps {
  imgId: number;
  imgSrc: string;
  sol: number;
}

const postSchema = yup.object().shape({
  post: yup.string().required('You must enter a comment'),
});

interface PostData {
  post: string;
}

export const Comments: React.FC<CommentsProps> = ({imgId, imgSrc, sol}) => {
  const {data_posts, loading_posts, requestPosts, createPost, refetchPosts} =
    usePost();

  useEffect(() => {
    requestPosts(imgId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgId]);

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<PostData>({
    defaultValues: {
      post: '',
    },
    resolver: yupResolver(postSchema),
  });
  if (loading_posts) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const onSubmitPost = async (post: PostData) => {
    await createPost({
      variables: {
        sol,
        img_id: imgId,
        img_source: imgSrc,
        post: post.post,
      },
    });

    refetchPosts({img_id: imgId});
    Keyboard.dismiss();

    reset();
  };

  if (errors.post?.message) {
    Alert.alert('Error', errors.post?.message);
  }

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <View style={styles.container}>
            {data_posts?.getPosts?.length === 0 || !data_posts?.getPosts ? (
              <Text>No hay comments</Text>
            ) : (
              data_posts?.getPosts.map(post => (
                <Comment
                  key={post.id}
                  item={post}
                  imgId={imgId}
                  imgSrc={imgSrc}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerInput}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{flex: 1}}
              defaultValue={value}
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmitPost)}>
          <Icon name="send" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  postContainer: {
    width: SIZES.width,
    height: 100,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  postText: {
    fontSize: 20,
    color: COLORS.black,
  },
  inputComment: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
