# 安装环境
FROM node:8.11.2
RUN apt-get update  && apt-get install -y nginx
# 建立临时工作目录
WORKDIR /usr/src/app
# 启动端口为80
EXPOSE 80
# 移出打包后的目录，删除项目源文件
RUN cp -r unpackage/dist/build/h5/* /var/www/html \
&& rm -rf /usr/src/app
# 启动
CMD ["nginx","-g","daemon off;"]