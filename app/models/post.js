module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            as: "post",
            foreignKey: {
                allowNull: false
            }
        });

        Post.belongsTo(models.Location, {
            as: "post",
            foreignKey: {
                allowNull: false
            }
        })

        Post.belongsTo(models.Season, {
            as: "post",
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Post;
};
