import Request from '@/utils/Request'
import { Article } from '@/types/Article'

// 新增文章
export const addArticleAPI = (data: Article) => Request<Article>("POST", "/article", data)

// 获取文章 [有id就获取单个，没有id就获取全部]
export const getArticleAPI = (id?: Article) => id ? Request<Article>("GET", `/article/${id}`) : Request<Article>("GET", `/article`)