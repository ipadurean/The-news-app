class CommentsController < ApplicationController

  def index
    @comments = Comment.all 
    render json: @comments
  end

  def create
    @comment = Comment.create(comment_params)
    render json: @comment
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    render json: @comment
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.delete
    render json: { message: "Successfully deleted"}
  end

  private

  def comment_params
    params.require(:comment).permit!
  end
end
