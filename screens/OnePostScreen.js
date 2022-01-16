import React from 'react'

import { StatusBar, ScrollView, FlatList } from 'react-native'

import styled from 'styled-components/native'

import AppBar from '../components/AppBar'
import ToolBar from '../components/ToolBar'
import Users from '../components/Users'
import Story from '../components/Story'
import Feed from '../components/Feed'
import Menu from '../components/Menu'
import fakeData from '../fakeData'
import { useState, useEffect } from 'react'
import usePost from '../hooks/usePost'
import ActivityIndicator from '../components/ActivityIndicator'
import { useIsFocused } from '@react-navigation/native';
import newApi from '../api/newApi';
