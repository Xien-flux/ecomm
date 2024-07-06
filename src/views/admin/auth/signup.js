const layout = require("../layout");

module.exports = ({ req }) => {
  return layout({
    content: `
        <div>
            Your session user id is ${req.session.userId}
            <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="confirmPassword" placeholder="confirm password" />
            <button>Sign Up </button>
            </form>
        </div>
    `,
  });
};