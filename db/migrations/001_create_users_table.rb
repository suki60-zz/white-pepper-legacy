Sequel.migration do
  change do
    create_table :users do
      String :id, primary_key: true, size: 7
      DateTime :created_at
    end
  end
end
