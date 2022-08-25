import React, { useState } from "react";
import styled from "styled-components/native";
import {images} from '../images';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import Input from "./Input";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme})=>theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0;
`;

const Contents = styled.Text`
  flex:1;
  font-size: 24px;
  color: ${({completed, theme})=> completed ? theme.done : theme.text};
  text-decoration: ${({completed})=> completed ? 'line-through' : 'none'};
`;

const Task = ({task,deleteTask,toggleTask,updateTask})=>{
  const [isEditing, setIsEditing] = useState(false);  
  const [text, setText] = useState(task.text);

  //항목 입력 완료시
  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  const _onSubmitEditing = () => {
    if(isEditing) {
        const editedTask = {...task, text:text};
        setIsEditing(false);
        updateTask(editedTask);
    }
  }

  const _onBlur = () => {
    if(isEditing){
        setIsEditing(false);
        setText(task.text);
    }
  }

  return isEditing ? (
        <Input 
            value={text}
            placeholder={'항목을 작성바랍니다'}
            onChangeText={text=>setText(text)}
            onSubmitEditing={_onSubmitEditing}
            onBlur={_onBlur}
        />
    ) :  
   (
    <Container>
        {/* 완료버튼 */}
      <IconButton type={task.completed ? images.completed : images.uncompleted}
                  onPressOut={toggleTask}
                  id={task.id}  
                  completed={task.completed}
      />
      {/* 할 일 */}
      <Contents completed={task.completed}>{task.text}</Contents>
      {/* 수정버튼 */}
      {task.completed || <IconButton
                             type={images.update}
                             onPressOut={_handleUpdateButtonPress}
                             />}
      {/* 삭제버튼 */}
      <IconButton type={images.delete} 
                  onPressOut={deleteTask}
                  id={task.id}
                  completed={task.completed}
      />
    </Container>
  )
};

Task.propTypes = {
  task:PropTypes.object.isRequired,
  deleteTask:PropTypes.func.isRequired,
  toggleTask:PropTypes.func.isRequired,
  updateTask:PropTypes.func.isRequired
}

export default Task;