`News App`


Frontend will be built with: HTML, CSS, and JavaScript
Frontend will communicate with a backend API that you'll build with Ruby and Rails.


Scrolling SPA of news articles linking to their hosting site
Likes & Comments for each article

> Models: 
RELATIONSHIPS:
Article has_many: Likes, Comments
Like belongs_to: Article
Comment belongs_to: Article



The links to articles will be added manually.

Deliverables:

A user can see a list of articles which will keep loading with scrolling.
A user would like/unlike article
A user could add a comment to a specific article
A user could click on an article and which will take him/her to the article’s home page
An article-s border color will change after click meaning it was already viewed

Read: Comment(pop up window when button clicked?)
Create: Create/Delete  likes
Delete: Delete likes, Delete comments
Update: Update comments


Features/Goals:
Search functionality to filter available news stories.
Tags attribute on the article model.


Schema
Articles
:name, :link, 

Comments
:article_id, :content, :author

Rating
:article_id, 

User
:username
