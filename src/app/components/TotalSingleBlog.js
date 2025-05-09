import React from 'react';
import Singleblog from './Singleblog';
import SingleComments from './SingleComments';
import SearchSidebar from './SearchSidebar';
import CategorySidebar from './CategorySidebar';
import RecentPost from './RecentPost';
import TagsSidebar from './TagsSidebar';
import NewsletterSidebar from './NewsletterSidebar';

function TotalSingleBlog({ title, image, description, date }) {
    return (
        <div className="blog-single-area bg de-padding">
            <div className="container">
                <div className="blog-single-wpr">
                    <div className="row ps g-5">
                        <div className="col-xl-8">
                            <Singleblog
                                title={title}
                                image={image}
                                description={description}
                                date={date}
                            />
                            {/* <SingleComments /> */}
                        </div>
                        <div className="col-xl-4">
                            <aside className="sidebar">
                                {/* Category */}
                                <CategorySidebar />
                                {/* Recent Post */}
                                <RecentPost />

                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TotalSingleBlog