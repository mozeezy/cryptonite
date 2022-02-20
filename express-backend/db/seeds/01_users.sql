INSERT INTO
users(id, first_name, last_name, email, password_digest, e_wallet, is_admin)
VALUES
    (1, 'Mario', 'Bros', 'mario@nintendo.com', 'd0147792c3b3911c0f7be4c629f4b7e2', '100000', true),
    (2, 'Luigi', 'Bros', 'luigi@nintendo.com', 'd0147792c3b3911c0f7be4c629f4b7e2', '120000', false),
    (
        3, 'Princess',
        'Peach',
        'peach@nintendo.com',
        'd0147792c3b3911c0f7be4c629f4b7e2',
        '140000',
        false
    ),
    (
        4, 'Princess',
        'Daisy',
        'daisy@nintendo.com',
        'd0147792c3b3911c0f7be4c629f4b7e2',
        '160000',
        false
    ),
    (5, 'Donkey', 'Kong', 'donkey@nintendo.com', 'd0147792c3b3911c0f7be4c629f4b7e2', '180000', false);