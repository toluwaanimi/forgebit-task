import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from '../../models/post.model';
import { getRepository } from 'typeorm';
import { CategoryEnum } from '../../common/enum/category,enum';
import { FilterSearchInput } from './dto/filter.input';

@Injectable()
export class PostService {
  async update(id: number, updatePostInput: UpdatePostInput, user) {
    const post = await getRepository(Post).findOne({
      where: {
        id,
        creator: user.id,
      },
    });
    if (!post) {
      throw new BadRequestException(
        'Invalid post or you dont have the permission to update this post',
      );
    }

    await getRepository(Post).update(post.id, {
      title: updatePostInput.title || post.title,
      content: updatePostInput.content || post.content,
      category: (updatePostInput.category as CategoryEnum) || post.category,
    });
    return await getRepository(Post).findOne({ where: { id: post.id } });
  }

  async deletePost(id: number, user) {
    const post = await getRepository(Post).findOne({
      where: {
        id,
        creator: user.id,
      },
    });
    if (!post) {
      throw new BadRequestException('Invalid post');
    }

    await getRepository(Post).delete(post.id);
    return;
  }

  async createPost(payload: CreatePostInput, user) {
    const post = await getRepository(Post).save({
      title: payload.title,
      content: payload.content,
      category: payload.category as CategoryEnum,
      creator: user.id,
    });
    return await getRepository(Post).findOne({
      where: {
        id: post.id,
      },
    });
  }

  async findOne(id) {
    const post: Post = await getRepository(Post).findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new BadRequestException('Invalid post id');
    }
    return post;
  }

  async findAll(payload?: FilterSearchInput) {
    let whereClause;
    if (payload?.title) {
      whereClause = [
        {
          title: payload.title,
        },
      ];
    } else if (payload?.category) {
      whereClause = [{ category: payload.category as CategoryEnum }];
    } else if (payload?.category && payload?.title) {
      whereClause = [
        {
          title: payload.title,
        },
        {
          category: payload.category as CategoryEnum,
        },
      ];
    } else {
      whereClause = {};
    }

    return await getRepository(Post).find({
      where: whereClause,
    });
  }
}
