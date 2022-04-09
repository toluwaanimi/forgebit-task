import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FilterSearchInput } from './dto/filter.input';

@Resolver(() => Post)
@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(
    @GetUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postService.createPost(createPostInput, user);
  }

  @Query(() => [Post], { name: 'findAllPosts' })
  findAll(@Args('filter', { nullable: true }) postFilter: FilterSearchInput) {
    return this.postService.findAll(postFilter);
  }

  @Query(() => Post, { name: 'findOnePost' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(
    @GetUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(id, updatePostInput, user);
  }

  @Mutation(() => Post, { nullable: true })
  removePost(
    @GetUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.postService.deletePost(id, user);
  }
}
