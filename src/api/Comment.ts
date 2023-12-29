import Request from '@/utils/Request'

// 新增评论
export const addCommentDataAPI = (data: Comment) => Request("POST", "/comment", data)

// 获取评论信息
export const getCommentDataAPI = (id: number) => Request<Comment[]>("GET", `/comment/${id}`);

// 获取评论列表
export const getCommentListAPI = (params?: {page: number, size: number}) => {
  // 如果有参数就是分页查询，没有参数就是查询全部
  if (params) {
    return Request<Comment[]>("GET", `/comment?page=${params.page}&size=${params.size}`);
  } else {
    return Request<Comment[]>("GET", "/comment");
  }
};