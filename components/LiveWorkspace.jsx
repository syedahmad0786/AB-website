'use client';
import {useEffect,useRef} from 'react';
import {SCENES,TIMING} from '../lib/workspaceScenes';
import {workspaceHTML} from '../lib/workspaceMarkup';
import {createLiveWorkspace} from '../lib/workspaceEngine';
export default function LiveWorkspace({mode='multi',active=0,onChannel,slug,idPrefix='lw-home',engineRef}){const ref=useRef(null),callback=useRef(onChannel);callback.current=onChannel;const initial=useRef(workspaceHTML({scenes:SCENES,mode,slug,idPrefix,active}));useEffect(()=>{const e=createLiveWorkspace(ref.current.querySelector('[data-lw]'),{scenes:SCENES,timing:TIMING,mode,start:active,onChannel:(i,s)=>callback.current?.(i,s)});if(engineRef)engineRef.current=e;return()=>e.destroy();},[]);return <div ref={ref} className="lw-host" dangerouslySetInnerHTML={{__html:initial.current}}/>;}
