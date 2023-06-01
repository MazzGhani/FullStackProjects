import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

function About() {
  return (
    <Accordion defaultActiveKey="0" style={{width:"50%"} } className="mx-auto">
      <Accordion.Item eventKey="0">
      <Accordion.Header>Click me if you're new ! </Accordion.Header>
      <Accordion.Body>
        Welcome to my site! The main goal of this site was to impolement a chat tool that users can create
        channels, view channels, sleect channels and create posts within said channles, and reply to post!
        To gain access to this site you'll need to either sign in or register! You can do so by following the steps in the 
        tab below. 
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>How to Register & Login</Accordion.Header>
      <Accordion.Body>
      <ListGroup as="ol" numbered>
      <ListGroup.Item as="li">Head over to the Account page in the NavBar</ListGroup.Item>
      <ListGroup.Item as="li">Click on the register Tab to create an Account</ListGroup.Item>
      <ListGroup.Item as="li">You can then head over to the login tab and login!</ListGroup.Item>
    </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
      <Accordion.Header>Creating a Channel</Accordion.Header>
      <Accordion.Body>
      <ListGroup as="ol" numbered>
      <ListGroup.Item as="li">Head over to Channels in the navigation bar</ListGroup.Item>
      <ListGroup.Item as="li">You can then either enter a channel or input a channel name and create one!</ListGroup.Item>
      <ListGroup.Item as="li">Once created , refresh the page and there should be one created at the bottom of the list</ListGroup.Item>
    </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>How to Create a post</Accordion.Header>
      <Accordion.Body>
      <ListGroup as="ol" numbered>
      <ListGroup.Item as="li">Once you've entered a channel , you can input a topic and data in yur post</ListGroup.Item>
      <ListGroup.Item as="li">Once you click on submit , refresh the page and your post should appear</ListGroup.Item>
      <ListGroup.Item as="li">Since you created the post, you're also able to go into it and delete it!</ListGroup.Item>
    </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="4">
      <Accordion.Header>How to Create a Conmment</Accordion.Header>
      <Accordion.Body>
      <ListGroup as="ol" numbered>
      <ListGroup.Item as="li">If you want to comment under a post you can click on more and then enter a comment</ListGroup.Item>
      <ListGroup.Item as="li">Click on Create a Comment and refresh the page </ListGroup.Item>
    </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="5">
      <Accordion.Header>How to Like and Dislike Posts</Accordion.Header>
      <Accordion.Body>
        Right under the post data there should be two buttons , one to like the post and the other to dislike. 
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="6">
      <Accordion.Header>How to use the Search System</Accordion.Header>
      <Accordion.Body>
        The Search System is broken into multiple parts 
        <ListGroup as="ol" numbered>
      <ListGroup.Item as="li">The first section allows you to search posts and comments for specific data. So if you search for key words in posts or comments it would show up there</ListGroup.Item>
      <ListGroup.Item as="li">The second section is a button that once pressed shows you the MOST LIKED POST at the moment </ListGroup.Item>
      <ListGroup.Item as="li">The third section is a dropdown menu of all the users currently on the site.You can select and see what user posted what</ListGroup.Item>
    </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  )
}

export default About