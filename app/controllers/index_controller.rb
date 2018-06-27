class IndexController < ApplicationController
  def home
  	@message = Message.new
  end

  def services
  end

  def about
  end

  def contact
  	@message = Message.new
  end
end
