import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from 'app/Router/Loading';
import NotFound from 'app/Router/NotFound';

const Welcome = lazy(() => import('app/Welcome'));
const SignIn = lazy(() => import('app/SignIn'));
const SignUp = lazy(() => import('app/SignUp'));

export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NotFound} />
        </Switch>
    </Suspense>
);