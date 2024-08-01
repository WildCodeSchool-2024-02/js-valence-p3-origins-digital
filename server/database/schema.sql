CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE video (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    isPrivate BOOLEAN NOT NULL,
    source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE commenting (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    user_id INT UNSIGNED NOT NULL,
    video_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);

CREATE TABLE rating (
    rating INT,
    user_id INT UNSIGNED NOT NULL,
    video_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY (user_id, video_id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);

CREATE TABLE add_favorite (
    user_id INT UNSIGNED NOT NULL,
    video_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (user_id, video_id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);

CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE add_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    video_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);

CREATE TABLE item (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);


INSERT INTO user (username, email, hashed_password, is_admin, avatar) values ("Martin", "martinlefevre@mail.com", "$argon2id$v=19$m=16,t=2,p=1$U2dZUTA4Z1BpS3BRNjZ3aQ$swVcRNFb8qfmlQo5KAmiuw", false, "https://res.cloudinary.com/djccw5t9o/image/upload/v1721386808/i4qqdqr3jzztctb1uqoy.png"), ("Emily", "emilydupont@mail.com", "$argon2id$v=19$m=16,t=2,p=1$U2dZUTA4Z1BpS3BRNjZ3aQ$swVcRNFb8qfmlQo5KAmiuw", false, "https://res.cloudinary.com/djccw5t9o/image/upload/v1721386808/i4qqdqr3jzztctb1uqoy.png"), ("Admin", "sophiemartin@mail.com", "$argon2id$v=19$m=16,t=2,p=1$U2dZUTA4Z1BpS3BRNjZ3aQ$7M5n8kkwMeDPlSwdA28tBg", true, "https://res.cloudinary.com/djccw5t9o/image/upload/v1721985259/hxlmjgr4ekmpuqgdn2t8.png");

INSERT INTO
    video (
        title,
        description,
        thumbnail,
        isPrivate,
        source,
        created_at
    )
VALUES (
        "Graceful Moves: Ballet Mastery",
        "Watch a dancer perfect her ballet routine in front of a mirror, showcasing elegance and skill.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140704/origins/mxljuwwyestc5at4kfil.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140704/origins/mxljuwwyestc5at4kfil.mp4",
        current_timestamp()
    ),
    (
        "Power & Grit: Kettlebell Workout",
        "Witness a determined woman lift a kettlebell, showcasing her strength and dedication in an intense gym session.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140701/origins/taxjsj9az3ihvzlpsab4.jpg",
        true,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140701/origins/taxjsj9az3ihvzlpsab4.mp4",
        current_timestamp()
    ),
    (
        "Soaring High: Paragliding Adventure",
        "An exhilarating scene of a man gliding through a sunny blue sky with a striking red paraglider.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140700/origins/n4pehuzjf5up39eajy7l.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140700/origins/n4pehuzjf5up39eajy7l.mp4",
        current_timestamp()
    ),
    (
        "Clash of Blades: Intense Fencing Duel",
        "Two skilled fencers engage in a thrilling indoor bout, showcasing precision and agility.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140698/origins/mola0bi5p9p6atmlgwes.jpg",
        true,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140698/origins/mola0bi5p9p6atmlgwes.mp4",
        current_timestamp()
    ),
    (
        "Smooth Strokes: Backstroke in Action",
        "A woman glides effortlessly through an indoor pool, demonstrating perfect backstroke technique.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140698/origins/jnh2ggcf02ytvmdtzwjk.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140698/origins/jnh2ggcf02ytvmdtzwjk.mp4",
        current_timestamp()
    ),
    (
        "Epic Battle: Tattooed Boxers Face Off",
        "Two fit, tattooed men face off in a dramatic boxing match, straight out of a movie scene.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140697/origins/mjptsbkertkm9qptbwxf.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140697/origins/mjptsbkertkm9qptbwxf.mp4",
        current_timestamp()
    ),
    (
        "Urban Ascent: Climbing Glass Heights",
        "Witness a man scaling an exterior glass structure resembling a building, using grips to reach the rooftop, with surrounding buildings creating a stunning backdrop.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140694/origins/efccabkctycfrdq3gkok.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140694/origins/efccabkctycfrdq3gkok.mp4",
        current_timestamp()
    ),
    (
        "Speed and Precision: Indoor Badminton Action",
        "A woman in action on a red-floored court, reaching forward with precision to strike the shuttlecock in an intense badminton training.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140694/origins/h9fbkwtp3m011xvwtsuf.jpg",
        true,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140694/origins/h9fbkwtp3m011xvwtsuf.mp4",
        current_timestamp()
    ),
    (
        "Mastering the Waves: Riding Turbulent Waters",
        "Watch as a skilled man navigates through turbulent waves with finesse and skill, triumphing over the challenging conditions.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140694/origins/c14mejgnqyyihx251fpv.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140694/origins/c14mejgnqyyihx251fpv.mp4",
        current_timestamp()
    ),
    (
        "Dynamic Volleyball Action: Setter to Attacker Spike",
        "Experience the excitement of indoor volleyball as a setter delivers a perfect pass to an attacker who unleashes a powerful spike.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140690/origins/fawffyhupkoblt3mvpzs.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140690/origins/fawffyhupkoblt3mvpzs.mp4",
        current_timestamp()
    ),
    (
        "Thrilling Dirt Bike Stunt: Speed and Skill",
        "Witness an exhilarating moment as a man performs a daring stunt on a dirt bike before speeding away with intensity.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140656/origins/m6ynr2jjilz0tisrebnn.jpg",
        true,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140656/origins/m6ynr2jjilz0tisrebnn.mp4",
        current_timestamp()
    ),
    (
        "Endurance Tested: Marathon Runners in Action",
        "Experience the determination of a woman and a man as they push through a marathon, giving their all despite the scorching heat, captured in a static shot.",
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140592/origins/d2lrzz3uekoxu0ceyf1t.jpg",
        false,
        "https://res.cloudinary.com/djccw5t9o/video/upload/v1721140592/origins/d2lrzz3uekoxu0ceyf1t.mp4",
        current_timestamp()
    );

INSERT INTO
    commenting (comment, user_id, video_id)
VALUES (
        "What an incredible game! The intensity was off the charts!",
        1,
        1
    ),
    (
        "Amazing performance by both teams. Such a thrilling match!",
        1,
        6
    ),
    (
        "The highlight reel from this game is going to be epic!",
        1,
        7
    ),
    (
        "Unbelievable! That last-minute goal was a game-changer!",
        1,
        9
    ),
    (
        "Props to the defense – they really stepped up today!",
        1,
        5
    ),
    (
        "This is why I love sports. Pure adrenaline and excitement!",
        1,
        2
    ),
    (
        "The teamwork and strategy on display were top-notch!",
        1,
        3
    ),
    (
        "Great effort! Can’t wait for the next match.",
        1,
        4
    ),
    (
        "What a comeback! Truly inspiring to watch.",
        1,
        8
    ),
    (
        "Every player gave it their all. Respect to both sides!",
        1,
        10
    ),
    (
        "I’ve never seen such a nail-biting finish before. Amazing!",
        2,
        1
    ),
    (
        "That was a masterclass in skill and determination.",
        2,
        2
    ),
    (
        "The atmosphere in the stadium must have been electric!",
        2,
        3
    ),
    (
        "Incredible athleticism from everyone on the field!",
        2,
        4
    ),
    (
        "So many memorable moments in this game. Instant classic!",
        2,
        5
    ),
    (
        "What a show of sportsmanship and talent. Well done!",
        2,
        6
    ),
    (
        "This is why [sport] is the best sport in the world!",
        2,
        7
    ),
    (
        "The intensity and passion were palpable. Loved every second!",
        2,
        8
    ),
    (
        "Can't believe the level of skill on display. Just wow!",
        2,
        9
    ),
    (
        "Looking forward to the rematch. It’s going to be epic!",
        2,
        10
    );

INSERT INTO
    rating (rating, user_id, video_id)
VALUES (4, 1, 1),
    (3, 1, 3),
    (5, 1, 2),
    (1, 1, 4),
    (2, 1, 5),
    (5, 1, 6),
    (2, 1, 7),
    (3, 1, 8),
    (2, 1, 9),
    (4, 1, 10),
    (3, 2, 1),
    (1, 2, 2),
    (2, 2, 3),
    (4, 2, 4),
    (5, 2, 5),
    (3, 2, 6),
    (4, 2, 7),
    (5, 2, 8),
    (3, 2, 9),
    (2, 2, 10);

INSERT INTO
    add_favorite (user_id, video_id)
VALUES (1, 1),
    (1, 3),
    (1, 2),
    (1, 4),
    (1, 5),
    (1, 9),
    (1, 10),
    (2, 1),
    (2, 2),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (2, 10);

INSERT INTO
    category (name)
VALUES ("Indoor"),
    ("Outdoor"),
    ("Extreme");

INSERT INTO
    add_category (category_id, video_id)
VALUES (1, 1),
(1, 2),
(2, 3),
(3, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 7),
(3, 7),
(1, 8),
(2, 9),
(3, 9),
(1, 10),
(2, 11),
(3, 11),
(2, 12)
