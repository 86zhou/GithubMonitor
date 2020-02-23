## GithubMonitor

### 前言

Github代码监控程序很多，如Github-Monitor，但是无法满足灵活的search规则，会存在比较多的误报，故重新写个Github代码监控程序，当然不一定比已有的完美，主要是借此机会锻炼下代码开发能力，学习前端开发框架ant design pro，能够快速的搭建简单的应用程序。    


#### 功能实现中......
1）创建扫描任务，管理任务    
2）查看任务扫描结果  
3）标记扫描结果：忽略  
4）扫描逻辑：支持Github api v3搜索格式search code, 一级关键词（搜索code），二级关键词（基于一级搜索结果，搜多当前页面），repo关键词（基于一级搜索结果的repo，搜索整个repo）  




### 1. Server Github扫描服务 

1. Github api存在速率限制  

	Github api在访问时存在速率限制，可参考API说明文档，在使用时需要判断响应头'Retry-After',下次请求需要等待的时间。  
	
		if 'Retry-After' in headers.keys():
            retry_after = headers['Retry-After']
            print('Retry-After please wait %s seconds......' % (retry_after))
            time.sleep(int(retry_after))
            
2. 在循环调用时，在跑到第9页时会抛出异常 'Max retries exceeded with url'

		按照网上说明，配置了header{'Connection':'close'},并使用session，搜索完成后关闭该session。  

3. Github API searchcode返回的结果不超过1000条  
	
	最初时不清楚API的返回结果限制，处理异常报错，经查看API发现是code搜索存在1000条的限制. 
	
		1. search code搜索默认设置搜索条件sort=indexed&order=desc，获取前1000条搜索数据。  
		2. 为了解决1000条的限制，可以通过条件搜索repo，例如限制创建的时间，在从repo中进行code搜索：https://api.github.com/search/repositories?q=language:Java&created>=2013-04-11T00:00:00Z&sort=created&order=asc
		
4. Failed to establish a new connection: [Errno 60] Operation timed out'))

		在本地跑脚本时经常遇到超时的情况，很不稳定，在云主机上则没有问题，暂时未解决，可能是本地网络问题。  
	
5. 铜鼓API接口扫描，如何获取对应的代码片段（暂未解决）


### 2. Client 前台

基于Ant Design Pro 4.0搭建，教程：https://pro.ant.design/docs/upgrade-v4-cn    
Ant Design组件：https://ant.design/docs/react/introduce-cn  


