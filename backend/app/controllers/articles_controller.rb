class ArticlesController < ApplicationController

  def index
    @articles = Article.all
    render json: @articles, include: [:comments, :ratings]

  end

  
end
