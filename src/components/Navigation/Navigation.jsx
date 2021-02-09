import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../shared/routes';

export const Navigation = () => (
  <nav>
    <div>
      <NavLink activeClassName="activeLink" to={routes.specializations.root}>
        Specializations
      </NavLink>
    </div>
    <div>
      <NavLink activeClassName="activeLink" to={routes.masters.root}>
        Masters
      </NavLink>
    </div>
  </nav>
);
