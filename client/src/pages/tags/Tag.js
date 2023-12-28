import React from 'react'
import LeftSidebar from "../../component/bars/leftsidebar/LeftSidebar";
import TagsList from "./TagsList";
import './Tag.css'
import RightSidebar from '../../component/bars/rightsidebar/RightSidebar';

const Tags = () => {
    const tagList=[{
        id:1,
        tagName:"javascript",
        tagDesc:"For question regarding in ECMAScript and its various dialects/implementations."
    },{
        id:2,
        tagName:"python",
        tagDesc:"For question regarding in ECMAScript and its various dialects/implementations."
    },{
        id:3,
        tagName:"C#",
        tagDesc:"For question regarding in ECMAScript and its various dialects/implementations."
    },{
        id:4,
        tagName:"C++",
        tagDesc:"For question regarding in ECMAScript and its various dialects/implementations."
    }
    ]
    return(
        <div className={"home-container-1"}>
            <LeftSidebar/>
            <div className={"home-container-2"}>
                <div className={'tag-container'}>
                <h1 className={'tag-h1'}> Tags </h1>
                <p className={'p'}>A tag is a keyword or label that categories your question with other, similar questions</p>
                <p className={'p'}>Using the right tags makes it easier for others to find and answer your question.</p>
                <div className={'tags-container'}>
                    {
                        tagList.map((tag,index)=>(
                            <TagsList key={index} tag={tag}/>
                        ))
                    }
                </div>
                </div>
                <RightSidebar/>
            </div>
        </div>
  )}
export default Tags