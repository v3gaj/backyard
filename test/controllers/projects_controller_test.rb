require 'test_helper'

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get project_backyard" do
    get projects_project_backyard_url
    assert_response :success
  end

end
