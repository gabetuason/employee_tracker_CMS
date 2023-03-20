INSERT INTO department (name) 
VALUES  
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title,salary,department_id)
VALUES  
    ('Sales Lead',120000,1),
    ('Salesperson',90000,1),
    ('Lead Engineer',150000,2),
    ('Software Engineer',115000,2),
    ('Account Manager',140000,3),
    ('Accountant',125000,3),
    ('Legal Team Lead',225000,4),
    ('Lawyer',190000,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES
    ('Johnny','Pro',1,NULL),
    ('Jackie','Chan',2,1),
    ('Lela','Rodriguez',3,NULL),
    ('Gabe','Tuason',4,3),
    ('Vjay','Singh',5,NULL),
    ('Habibi','Brown',6,5),
    ('Jill','Lourd',7,NULL),
    ('Tom','Allen',8,7);
