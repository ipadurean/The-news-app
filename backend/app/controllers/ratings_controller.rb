class RatingsController < ApplicationController

  def create
    @rating = Rating.create(rating_params)
    
    render json: @rating
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.delete
    render json: { message: "Successfully deleted"}
  end

  private

  def rating_params
    params.require(:rating).permit!
  end

end
