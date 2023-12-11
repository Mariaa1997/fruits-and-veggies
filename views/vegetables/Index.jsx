const React = require('react');


class Index extends React.Component {
    render() {
        const { vegetables } = this.props;
        // const vegetables = this.props.vegetables;

        return (
            <div>
                <h1>Vegetable Index Page</h1>
                <nav>
                    <a href="/vegetables/new">Create a New Vegetable</a>
                </nav>
                <ul>
                    {vegetables.map((vegetable, i) => {
                        return (
                            <li>
                                The
                                <a href={`/vegetables/${vegetable._id}`}>
                                    {vegetable.name}
                                </a> {' '}
                                is {vegetable.color} <br></br>
                                {vegetable.readyToEat
                                ? `It is ready to eat`
                            : `It is NOT ready to eat`}
                            <br />
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;