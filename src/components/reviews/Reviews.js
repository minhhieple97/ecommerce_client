
import { Comment, List } from 'antd';
import Rate from '../rate/Rate';
const data = [
    {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        )
    },
    {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        )
    },
];

const Reviews = () => {
    return <List
        className="comment-list"
        header={`${data.length} comments`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <li>
                <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                    children={<Rate></Rate>}
                />
            </li>
        )}
    />
}

export default Reviews
