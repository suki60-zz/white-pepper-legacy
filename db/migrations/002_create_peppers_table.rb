Sequel.migration do
  change do
    create_table :peppers do
      primary_key :id
      String :text, text: true
      Fixnum :client_x
      Fixnum :client_y
      foreign_key :user_id, :users, :null => false
    end
  end
end
